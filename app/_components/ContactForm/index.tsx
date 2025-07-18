"use client"

import { createContactData } from "@/app/_actions/contact";
import { useFormState } from "react-dom";
import styles from "./index.module.css";
import emailjs from '@emailjs/browser'; // EmailJSをインポート

const initialState = {
    status: "",
    message: "",
    data: undefined, // フォームデータを保持するためのフィールドを追加
};

export default function ContactForm(){
    const [state, formAction] = useFormState(createContactData, initialState);

    // state.statusが'success'で、かつdataが存在する場合にEmailJSを送信
    if (state.status === "success" && state.data) {
        const { lastname, firstname, company, email, message } = state.data;

        // EmailJSのテンプレート変数に合わせたオブジェクトを作成
        const templateParams = {
            lastname,
            firstname,
            company,
            email,
            message,
        };

        emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
            templateParams,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        )
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            // ここでユーザーに成功メッセージを表示するなどの処理を追加できます
            // 例: stateを更新して成功メッセージを表示
        })
        .catch((err) => {
            console.log('FAILED...', err);
            // ここでユーザーにエラーメッセージを表示するなどの処理を追加できます
            // 例: stateを更新してエラーメッセージを表示
        });

        return(
            <p className={styles.success}>
                お問い合わせいただき、ありがとうございます。<br />
                お返事まで今しばらくお待ち下さい。
            </p>
        );
    }    

    return(
        <form className={styles.form} action={formAction}>
            <div className={styles.horizontal}>
                <div className={styles.item}>
                    <label className={styles.labgel} htmlFor="lastname">
                        姓
                    </label>
                    <input className={styles.textfield} type="text" id="lastname" name="lastname" />
                </div>
                <div className={styles.item}>
                    <label className={styles.labgel} htmlFor="firstname">
                        名
                    </label>
                    <input className={styles.textfield} type="text" id="firstname" name="firstname" />
                </div>
            </div>
            <div className={styles.item}>
                <label className={styles.labgel} htmlFor="company">
                    会社名
                </label>
                <input className={styles.textfield} type="text" id="company" name="company" />
            </div>
            <div className={styles.item}>
                <label className={styles.labgel} htmlFor="email">
                    メールアドレス
                </label>
                <input className={styles.textfield} type="text" id="email" name="email" />
            </div>
            <div className={styles.item}>
                <label className={styles.labgel} htmlFor="message">
                    メッセージ
                </label>
                <textarea className={styles.textarea} id="message" name="message" />
            </div>
            <div className={styles.actions}>
                {state.status === "error" && (
                    <p className={styles.error}>{state.message}</p>
                )}
                <input type="submit" value="送信する" className={styles.button} />
            </div>
        </form>
    );
}