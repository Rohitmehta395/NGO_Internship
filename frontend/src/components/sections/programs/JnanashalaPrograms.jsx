import { CardGlass } from "../../common/cards/ProgramCard";
import { AllPrograms } from "../../../utils/constants";

const SharadaPrograms = () => {
  return (
    <div>
      {AllPrograms.projectJnanashala.map((p, idx) => (
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

export default SharadaPrograms;
