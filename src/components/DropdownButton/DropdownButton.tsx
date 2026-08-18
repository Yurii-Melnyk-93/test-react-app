import { useRef, useState } from "react";
import type { DropdownProps } from "@/types/DropdownProps";
import styles from "./DropdownButton.module.scss";
import { Button } from "@/components/AddProjectButton";
import { useClickOutside } from "@/hooks/useClickOutside";

const DropdownButton = ({ label, items }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }

  const handleItemClick = (item: string) => {
    console.log(`Selected item: ${item}`); 
    setIsOpen(false);
  }

  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
        <Button className={styles.dropdownButton} buttonText={label} onClick={toggleDropdown} />
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

export { DropdownButton };