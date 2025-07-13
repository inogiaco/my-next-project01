import Image from "next/image";
import styles from "./index.module.css";


export default function Header(){
    return(
        <header className={styles.header}>
            <a href="/" className={styles.loglink}>
            <Image
                src="/logo.svg"
                alt="SIMPLE" 
                width={200} 
                height={133} 
                priority
            />
            </a>
        </header>
    );
}