import React from "react";
import styles from "./InfoCard.module.css";

type InfoCardProps = {
  data: { name: string; count: number };
  className?: string;
  onClose: () => void;
};

const InfoCard = ({ data, className, onClose }: InfoCardProps) => {
  const specificTextMap: { [key: string]: string } = {
    Reptile: "This category represents the count of bird species.",
    Mammal: "This category represents the count of mammal species.",
    Bird: "This category represents the count of bird species.",
    Fish: "This category represents the count of fish species.",
    Fungi: "This category represents the count of fungi species.",
    Insect: "This category represents the count of insect  species.",
    Algae: "This category represents the algae count",
    Amphibian: "This category represents the count of amphibian species.",
    Present: "This is the percent of recorded present occurance.",
    Approved: "This is thetext  of the approved percent",
    Unknown: "This is the text of the unknown percent",
    "Not Present": "This is the percent of recorded not present occurance.",
    "Not Confirmed": "This is the percent of recorded not present occurance.",
    Rodentia:
      "Rodents are mammals of the order Rodentia, which are characterized by a single pair of continuously growing incisors in each of the upper and lower jaws. About 40% of all mammal species are rodents. ",
    Asparagales:
      "Asparagales is an order of plants in modern classification systems. Most species of Asparagales are herbaceous perennials, although some are climbers and some are trees or shrubs. The order also contains many geophytes (bulbs, corms, and various kinds of tuber).",
    Coraciiformes:
      "The Coraciiformes are a group of usually colourful birds including the kingfishers, the bee-eaters, the rollers, the motmots, and the todies. They generally have syndactyly, with three forward-pointing toes, though in many kingfishers one of these is missing",
    Caudata:
      "Salamanders are a group of amphibians typically characterized by their lizard-like appearance, with slender bodies, blunt snouts, short limbs projecting at right angles to the body, and the presence of a tail in both larvae and adults.",
    Acorales:
      "Acorales, the sweet flag order of flowering plants and the most basal lineage among the monocotyledons (monocots), which are characterized by having a single seed leaf. This order contains the single family Acoraceae and one genus (Acorus), which comprises two to four species of plants that resemble the irises.",
    Cornales:
      "The Cornales are an order of flowering plants, early diverging among the asterids, containing about 600 species. Plants within the Cornales usually have four-parted flowers, drupaceous fruits, and inferior to half-inferior gynoecia topped with disc-shaped nectaries.",
    Lamiales:
      "The order Lamiales are an order in the asterid group of dicotyledonous flowering plants. It includes about 23,810 species, 1,059 genera, and is divided into about 25 families.",
    Rosales:
      "Rosales is an order of flowering plants. It is sister to a clade consisting of Fagales and Cucurbitales. It contains about 7,700 species, distributed into about 260 genera. Rosales comprise nine families, the type family being the rose family, Rosaceae. The largest of these families are Rosaceae and Urticaceae",
    Lecanorales:
      "The Lecanorales are an order of mostly lichen-forming fungi belonging to the class Lecanoromycetes in the division Ascomycota. The order contains 26 families, 269 genera, and 5695 species.",
    Carnivora:
      "Carnivor is an order of placental mammals that have specialized in primarily eating flesh, whose members are formally referred to as carnivorans. The order Carnivora is the fifth largest order of mammals, comprising at least 279 species on every major landmass and in a variety of habitats.",
    Gruiformes:
      "The Gruiformes are an order containing a considerable number of living and extinct bird families, with a widespread geographical diversity. Gruiform means 'crane-like'. Traditionally, a number of wading and terrestrial bird families that did not seem to belong to any other order were classified together as Gruiformes",
    Poales:
      "The Poales are a large order of flowering plants in the monocotyledons, and includes families of plants such as the grasses, bromeliads, rushes and sedges. Sixteen plant families are currently recognized by botanists to be part of Poales.",
    Passeriformes:
      "A passerine is any bird of the order Passeriformes which includes more than half of all bird species. Sometimes known as perching birds, passerines generally have an anisodactyl arrangement of their toes, which facilitates perching.",
    Asterales:
      "Asterales is an order of dicotyledonous flowering plants that includes the large family Asteraceae known for composite flowers made of florets, and ten families related to the Asteraceae.",
    Charadriiformes:
      "Charadriiformes is a diverse order of small to medium-large birds. It includes about 390 species and has members in all parts of the world. Most charadriiform birds live near water and eat invertebrates or other small animals; however, some are pelagic, others frequent deserts, and a few are found in dense forest.",
    Ericales:
      "The Ericales are a large and diverse order of dicotyledons. Species in this order have considerable commercial importance including for tea, persimmon, blueberry, kiwifruit, Brazil nuts, argan, and azalea. The order includes trees, bushes, lianas, and herbaceous plants",
    Hymenoptera:
      "Hymenoptera is a large order of insects, comprising the sawflies, wasps, bees, and ants. Over 150,000 living species of Hymenoptera have been described, in addition to over 2,000 extinct ones. Many of the species are parasitic. ",
    Boraginales:
      "Boraginales is an order of flowering plants in the asterid clade, with a total of about 125 genera and 2,700 species. Different taxonomic treatments either include only a single family, the Boraginaceae, or divide it into up to eleven families. Its herbs, shrubs, trees and lianas have a worldwide distribution.",
    Fabales:
      "Fabales is an order of flowering plants included in the rosid group of the eudicots in the Angiosperm Phylogeny Group II classification system. In the APG II circumscription, this order includes the families Fabaceae or legumes, Quillajaceae, Polygalaceae or milkworts, and Surianaceae.",
  };

  const displayText =
    specificTextMap[data.name] || "Default text for non-specific keys.";

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={`${styles.infoCard} ${className}`}>
        <button className={styles["close-button"]} onClick={onClose}>
          &times;
        </button>
        <h2>{data.name}</h2>
        <p className={styles.flex}>Count: {data.count}</p>
        <p>{displayText}</p>
      </div>
    </>
  );
};

export default InfoCard;
