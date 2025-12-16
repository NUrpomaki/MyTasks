export interface Task {
  /** Tehtävän yksilöllinen tunniste */
  id: string;

  /** Tehtävän otsikko */
  title: string;

  /** Tehtävän tarkempi kuvaus */
  description?: string;

  /** Onko tehtävä valmis? */
  completed: boolean;

  /** Aikaleima tehtävän luomisesta */
  createdAt: number;

  /** Tehtävään liitetyn kuvan URI (valinnainen) */
  imageUri?: string;
}