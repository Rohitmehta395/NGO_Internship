import { AllPrograms } from "../../../utils/constants";
import { CardGlass } from "../../common/cards/ProgramCard";
const OtherPrograms = () => {
  return (
    <div>
      {AllPrograms.others.map((p, idx) => (
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

export default OtherPrograms;
