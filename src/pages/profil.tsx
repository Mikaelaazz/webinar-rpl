import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import DefaultLayout from "@/layouts/defaultmain";
import { Image, Button } from "@heroui/react";
import { Input } from "@heroui/input";
import { EditIcon } from "@/components/icons"; 
import { FaCamera } from "react-icons/fa";

export default function ProfilPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col lg:flex-row gap-10 p-4 md:p-8">
        {/* Profile Image Section - Will appear first on mobile */}
        <div className="order-1 lg:order-2 flex flex-col gap-4 items-center w-full lg:w-auto">
          <div className="relative">
            <Image
              className="rounded-full object-cover pointer-events-none"
              alt="Profil User"
              src="https://heroui.com/images/hero-card-complete.jpeg"
              width={153}
              height={153}
            />
            <Button
              isIconOnly
              className="absolute -bottom-1 -right-[0px] z-10 bg-secondary-500 text-white rounded-full"
              aria-label="Edit Photo"
            >
              <FaCamera className="w-5 h-5" />
            </Button>
          </div>

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

        {/* Form Section - Will appear second on mobile */}
        <div className="order-2 lg:order-1 flex flex-wrap gap-4 w-full lg:w-[700px]">
          <Input
            color="secondary"
            label="NAMA"
            type="text"
            variant="flat"
            readOnly
            className="w-full"
          />
          <Input
            color="secondary"
            label="NIM"
            type="number"
            variant="flat"
            readOnly
            className="w-full"
          />
          <Input
            color="secondary"
            label="EMAIL"
            type="email"
            variant="flat"
            readOnly
            className="w-full"
          />
          <Input
            color="secondary"
            label="INSTANSI"
            type="text"
            variant="flat"
            readOnly
            className="w-full"
          />

          <div className="flex flex-row gap-2 pt-4 w-full">
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
      </section>
    </DefaultLayout>
  );
}