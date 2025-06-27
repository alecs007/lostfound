import styles from "./page.module.scss";
import EditPostForm from "../../components/EditPostForm/EditPostForm";
export default async function EditPostPage() {
  return (
    <main className={styles.editpost}>
      <EditPostForm />
    </main>
  );
}
