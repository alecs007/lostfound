import styles from "./Categories.module.scss";
import Image from "next/image";

export default function Categories() {
  const categories = [
    {
      name: "Animale",
      image: "/icons/pets.png",
    },
    {
      name: "Bijuterii",
      image: "/icons/jewelry.png",
    },
    {
      name: "Documente",
      image: "/icons/id.png ",
    },
    {
      name: "Jucării",
      image: "/icons/toys.png",
    },
    {
      name: "Chei",
      image: "/icons/keys.png",
    },
    {
      name: "Electronice",
      image: "/icons/electronics.png",
    },
    {
      name: "Carduri",
      image: "/icons/cards.png",
    },
    {
      name: "Portofele",
      image: "/icons/wallet.png",
    },
    {
      name: "Haine",
      image: "/icons/clothes.png",
    },
    // {
    //   name: "Ochelari",
    //   image: "/icons/glasses.png",
    // },
    // {
    //   name: "Ceasuri",
    //   image: "/icons/watch.png",
    // },
    {
      name: "Altele",
      image: "/icons/other.png",
    },
  ];
  return (
    <section className={styles.categories}>
      <h1>Categorii</h1>
      <div className={styles.categoriescontainer}>
        {categories.map((category) => (
          <div className={styles.category} key={category.name}>
            <div className={styles.imagecontainer}>
              <div className={styles.image}>
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="100%"
                />
              </div>
            </div>
            <div className={styles.text}>
              <p>{category.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
