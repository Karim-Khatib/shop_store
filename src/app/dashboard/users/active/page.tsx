import ActiveUserTableComponent from "@/app/dashboard/users/active/ActiveUserTableComponent";
import DashboardPageTitle from "@/app/dashboard/DashboardPageTitle";
import DashboardTableHeader from "@/app/dashboard/DashboardTableHeader";
import CreateUserDialogComponent from "./CreateUserDialogComponent";
type Props = {
  searchParams: Promise<{ pageSize?: string; page?: string; search?: string }>;
  params: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function Users(props: Props) {
  const params = await props.searchParams;
  const pageSizeNumber = parseInt(params?.pageSize ?? "0");
  const page = parseInt(params?.page ?? "0");
  return (
    <div className=" w-full h-screen p-4 space-y-4 bg-neutral-100 overflow-hidden">
      <DashboardPageTitle title="Active Users" subtitle="60 user" />
      <div className="h-8 flex-none" />

      <DashboardTableHeader currentValue={params.search}>
        <CreateUserDialogComponent />
      </DashboardTableHeader>
      {/* <Suspense fallback={<Loading></Loading>}> */}
        <ActiveUserTableComponent
          page={page}
          pageSize={pageSizeNumber}
          search={params.search}
        />
      {/* </Suspense> */}
    </div>
  );
}
