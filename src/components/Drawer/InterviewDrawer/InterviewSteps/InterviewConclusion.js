
import { useSelector } from 'react-redux';

const InterviewConclusion = () => {
    const messages = useSelector(state => state.interview.data.messages);
    const conclusionData = messages[messages.length - 1].content.replace('END of the INTERVIEW.', '');

    return (
        // TODO 
        // TODO  create a structured output
        // TODO
        // TODO 
        <div>
            {
                conclusionData
            }
        </div>
    );
};

export default InterviewConclusion;