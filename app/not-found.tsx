import styles from "./not-found.module.css";

export default function NotFOund(){
    return(
        <div className={styles.container}>
            <dl>
                <dt className={styles.title}>ページは見つかりませんでした</dt>
                <dd className={styles.text}>
                    あなたがアクセスしようとしたページは存在しません。
                    <br />
                    URLを再度ご確認ください。
                </dd>
            </dl>
        </div>
    );  
}