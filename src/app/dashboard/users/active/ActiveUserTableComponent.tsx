import { getUserPagination } from "@/backend/users/UsersRepository";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import UserProfile from "@/assets/UserProfile.png";
import { PaginationWithLinks } from "../../PaginationWithLinks";
import Image from "next/image";
interface ActiveUserTableComponentProps {
  pageSize?: number;
  page?: number;
  search?: string;
}
export default async function ActiveUserTableComponent(
  props: ActiveUserTableComponentProps
) {
  const response = await getUserPagination(
    props.page,
    props.pageSize,
    props.search
  );

  return (
    <>
      <Table className="bg-neutral-0 p-0.5 h-1/2 ">
        <TableHeader>
          <TableRow>
            <TableHead className="sticky -top-0.5 z-20 bg-neutral-0">
              NO
            </TableHead>
            <TableHead className="sticky top-0 z-20 bg-neutral-0">
              Personally Picture
            </TableHead>
            <TableHead className="sticky top-0 z-20 bg-neutral-0">
              Full Name
            </TableHead>
            <TableHead className="sticky top-0 z-20 bg-neutral-0">
              Email
            </TableHead>
            <TableHead className="sticky top-0 z-20 bg-neutral-0">
              Birth Day
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="h-[400px] overflow-y-scroll">
          {response.data.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Image
                  src={user.imageUrl ?? UserProfile}
                  width={100}
                  height={100}
                  alt={user.fullName}
                  className="w-10 h-10 rounded-full"
                />
              </TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>{`${user.birthDay.getFullYear()}/${user.birthDay.getMonth()}/${user.birthDay.getDay()}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationWithLinks
        className="p-3.5 flex-none"
        page={response.page ?? 1}
        pageSize={response.pageSize ?? 10}
        totalCount={response.total}
        pageSizeSelectOptions={{
          pageSizeOptions: [10, 20, 30, 50, 100],
        }}
      />
    </>
  );
}
