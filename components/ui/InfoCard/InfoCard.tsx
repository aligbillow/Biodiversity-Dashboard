import React from "react";
import styles from "./InfoCard.module.css";

type InfoCardProps = {
  data: { name: string; count: number };
  className?: string;
  onClose: () => void;
};

const InfoCard = ({ data, className, onClose }: InfoCardProps) => {
  return (
    <div className={styles.infoCard}>
      <button className="close-button" onClick={onClose}>
        &times;
      </button>

      <h2>{data.name}</h2>
      <p className="flex">Count: {data.count}</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in
      </p>
    </div>
  );
};

export default InfoCard;
