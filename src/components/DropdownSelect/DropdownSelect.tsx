import { useRef, useState } from "react";
import type { DropdownProps } from "@/types/DropdownProps";
import styles from "./DropdownSelect.module.scss";
import { Button } from "@/components/AddProjectButton";
import { useClickOutside } from "@/hooks/useClickOutside";

const DropdownSelect = ({ label, items }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    console.log(`Selected item: ${item}`); 
    setIsOpen(false);
  }

  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
        <Button className={styles.dropdownButton} buttonText={selectedItem || label} onClick={toggleDropdown} />
      {isOpen && (
        <ul className={styles.menu}>
          {items.map((item) => (
            <li
              key={item}
              className={styles.item}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { DropdownSelect };