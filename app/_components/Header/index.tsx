import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import Menu from "../Menu";


export default function Header(){
    return(
        <header className={styles.header}>
            <Link href="/" className={styles.loglink}>
            <Image
                src="/logo.svg"
                alt="SIMPLE" 
                width={200} 
                height={133} 
                priority
            />
            </Link>
            <Menu />
        </header>
    );
}