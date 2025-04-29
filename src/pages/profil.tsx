import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import DefaultLayout from "@/layouts/defaultmain";
import {Image} from "@heroui/react";
import { Input } from "@heroui/input";

export default function ProfilPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-row gap-10 p-4 md:p-8">
        <div className="flex flex-wrap gap-4 w-[700px]">
            <Input
            color="secondary"
            label="NAMA"
            type="text"
            variant="flat"
            readOnly
            />
            <Input
            color="secondary"
            label="NIM"
            type="number"
            variant="flat"
            readOnly
            />
            <Input
            color="secondary"
            label="EMAIL"
            type="email"
            variant="flat"
            readOnly
            />
            <Input
            color="secondary"
            label="INSTANSI"
            type="text"
            variant="flat"
            readOnly
            />
            

            <div className="flex flex-row gap-2 pt-4">
            <Link
                className={buttonStyles({
                color: "secondary",
                radius: "full",
                variant: "solid",
                size: "sm",

                })}
                href="/"
            >
                Cancel
            </Link>
            <Link
                className={buttonStyles({
                color: "secondary",
                radius: "full",
                variant: "solid",
                size: "sm",

                })}
                href="/"
            >
                Save
            </Link>
            </div>
        </div>
        <div className="flex flex-col gap-4 items-center">
            <div className="flex flex-col gap-4 items-center">
                <Image
                className="rounded-full object-cover pointer-events-none"
                alt="HeroUI hero Image"
                src="https://heroui.com/images/hero-card-complete.jpeg"
                width={153}
                height={153}
                />

                <Link
                    className={buttonStyles({
                    color: "secondary",
                    radius: "full",
                    variant: "solid",
                    size: "sm",

                    })}
                    href="/"
                >
                    Remove
                </Link>
            </div>
            <div className="w-full">
                <Input
                color="secondary"
                label="Bergabung Pada"
                type="number"
                variant="flat"
                readOnly
                />
            </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
