import { DropdownSelect } from "@/components/DropdownSelect";

export function HeaderMenu() {
  return (
    <div className="header-menu">
      <DropdownSelect label="Select an option" items={["Option 1", "Option 2", "Option 3"]} />
    </div>
  )
}