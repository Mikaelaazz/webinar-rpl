import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/defaultadmin";
import { Search } from "@/components/search";
import { CardView } from "@/components/card";

export default function DashboardAdminPage() {
  return (
    <DefaultLayout>
      <section>
        <div className="flex flex-row gap-4 mb-4">

            <div className="bg-red-500 rounded-2xl p-4 w-full">
                <h1 className="pb-4">Total User</h1>
                <small className="flex flex-col text-left">0</small>
            </div>
            <div className="bg-blue-500 rounded-2xl p-4 w-full">
                <h1 className="pb-4">Total Webinar</h1>
                <small className="flex flex-col text-left">0</small>
            </div>
        </div>


      </section>
    </DefaultLayout>
  );
}
