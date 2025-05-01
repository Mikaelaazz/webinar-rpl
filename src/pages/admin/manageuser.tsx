import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/defaultadmin";
import { Search } from "@/components/search";
import { CardView } from "@/components/card";
import Table from "@/components/table";

export default function ManageUserPage() {
  return (
    <DefaultLayout>
      <section>
        <Table/>
      </section>
    </DefaultLayout>
  );
}
