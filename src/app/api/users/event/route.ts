import { User } from "@/backend/mongodb/models/Users";
import { connectDB } from "@/backend/mongodb/MongoDbProvider";
import { getUserPagination } from "@/backend/users/UsersRepository";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // Required for streaming

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function watchUserChanges() {
  try {
    await connectDB();
    const collection = User.collection;
    const changeStream = collection.watch();
    
    changeStream.on('error', (error) => {
      console.error(' Error:', error);
    });

    return changeStream;
  } catch (error) {
    console.error('Failed to create change stream:', error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    const encoder = new TextEncoder();
    const { searchParams } = new URL(request.url);
    let page = Number( searchParams.get("page")??"0")||0;
    let pageSize =  Number(searchParams.get("pageSize")??0)||0;
    const search = searchParams.get("search") || undefined;
    if(page<=0){
        page = 1;
    }
    if(pageSize<=0){
        pageSize = 10;
    }
    if(pageSize>100){
      pageSize = 100;
    }
    const sendEvent = async () => {
      const response = await getUserPagination(
        page,
        pageSize,
        search
      );
      
      writer.write(encoder.encode(`${JSON.stringify(response)}`));
    };
  
    sendEvent();
    const changeStream = await watchUserChanges();
    
    changeStream.on("change", sendEvent);
    changeStream.on("error", (error) => {
      console.error('Change Stream Connection Error:', error);
      writer.write(encoder.encode(`event: error\ndata: ${JSON.stringify({error: 'Connection error'})}\n\n`));
    });
  
    request.signal.addEventListener("abort", () => {
      try {
        changeStream.close();
        writer.close();
      } catch (error) {
        console.error('Error during cleanup:', error);
      }
    });
  
    return new Response(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error('SSE Endpoint Error:', error);
    return new Response(JSON.stringify({error: 'Internal server error'}), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
// export default function GET(req: NextApiRequest, res: NextApiResponse) {
//   res.writeHead(200, {
//     "Content-Type": "text/event-stream",
//     "Cache-Control": "no-cache",
//     Connection: "keep-alive",
//   });
//   const sendEvent = () => {
//     const data = {
//       message: "Hello from server",
//       time: new Date().toISOString(),
//     };

//     res.write(`data: ${JSON.stringify(data)}\n\n`);
//   };

//   sendEvent();
//   const interval: NodeJS.Timeout[] =[]
//   for (let i = 0; i < 10; i++) {
//     interval.push(  setTimeout(sendEvent, 1000 * i));
//   }

//   req.on("close", () => {
//     interval.forEach((interval) => {
//       clearInterval(interval);
//     });
//     // clearInterval();
//     res.end();
//   });
// }
