import { AllPrograms } from "../../../utils/constants";
import { CardGlass } from "../../common/cards/ProgramCard";
const SulabhPrograms = () => {
  return (
    <div>
      {AllPrograms.projectSulabh.map((p, idx) => (
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

export default SulabhPrograms;
