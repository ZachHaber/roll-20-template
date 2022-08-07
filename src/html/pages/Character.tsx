import { Attributes } from "../components/Attributes.js";
import { Defenses } from "../components/Defenses.js";
import { Header } from "../components/Header.js";
import { Archetype } from "./character/Archetype.js";
import { Armor } from "./character/Armor.js";
import { Equipment } from "./character/Equipment.js";
import { Lineage } from "./character/Lineage.js";
import { Spells } from "./character/Spells.js";
import { Weapons } from "./character/Weapons.js";

export function Character() {
  return (
    <article id="character" className="character nav-display">
      <Header />
      <Attributes />
      <Defenses />
      <Armor />
      <Weapons />
      <Lineage />
      <Archetype />
      <Equipment />
      <Spells />
    </article>
  );
}
