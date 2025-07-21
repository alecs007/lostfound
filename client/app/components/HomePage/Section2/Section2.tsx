import styles from "./Section2.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Section2() {
  return (
    <section className={styles.section2}>
      <div className={styles.container}>
        <div className={styles.box}>
          <h2>Ai pierdut sau ai găsit ceva ce nu îți aparține?</h2>
          <Link href="/create-post" className={styles.button}>
            Postează acum
            <Image
              src="/icons/click.svg"
              alt="Click"
              width={30}
              height={30}
              draggable={false}
            />
          </Link>
        </div>
        <div className={styles.info}>
          <p className={styles.heading}>Rezolvă mai rapid cu Lost & Found</p>
          <div className={styles.advantage}>
            <Image
              src="/icons/search-yellow2.svg"
              alt="Search Icon"
              width={20}
              height={20}
              draggable={false}
            />
            <p>
              Publică postarea în <b>cea mai mare bază de date</b> din țară
            </p>
          </div>
          <div className={styles.advantage}>
            <Image
              src="/icons/stocks.svg"
              alt="Stocks Icon"
              width={20}
              height={20}
              draggable={false}
            />
            <p>
              Mărește-ți șansele de a-ți <b>recupera bunul pierdut</b>
            </p>
          </div>
          <div className={styles.advantage}>
            <Image
              src="/icons/email-sent.svg"
              alt="Email Icon"
              width={20}
              height={20}
              draggable={false}
            />
            <p>
              Anunță <b>membrii echipei Crew</b> din apropierea ta
            </p>
          </div>
          <div className={styles.advantage}>
            <Image
              src="/icons/print-yellow.svg"
              alt="Print Icon"
              width={20}
              height={20}
              draggable={false}
            />
            <p>
              Printează <b>afișe cu QR Code</b> direct către postarea ta
            </p>
          </div>
          <div className={styles.advantage}>
            <Image
              src="/icons/megaphone.svg"
              alt="Megaphone Icon"
              width={20}
              height={20}
              draggable={false}
            />
            <p>
              Răspândește vestea către <b>mii de oameni</b> din România
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
