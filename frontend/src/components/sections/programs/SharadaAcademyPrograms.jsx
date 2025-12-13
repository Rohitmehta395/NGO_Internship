import { AllPrograms } from "../../../utils/constants";
import { CardGlass } from "../../common/cards/ProgramCard";
const SharadaAcademyPrograms = () => {
  return (
    <div>
      {AllPrograms.sharadaAcademy.map((p, idx) => (
        <CardGlass
          key={idx}
          image={p.image}
          title={p.title}
          description={p.description}
        />
      ))}
    </div>
  );
};

export default SharadaAcademyPrograms;
