import { useActionState } from "react";
import { Score } from "../model/Score";
import { scoreService } from "../service/ScoreService";

interface FormStatus {
    done: boolean;
}

interface NewScoreProps {
    points: number;
    mode: string;
    onSubmit(score: Score) : void;
}

const NewScore = ({points, mode, onSubmit} : NewScoreProps) => {

    const actionCallback = async (prev: FormStatus, formData: FormData): Promise<FormStatus> => {
        const username = formData.get("username");
        
        if (username && typeof username === 'string') {
            let newScore = new Score(null, points, username, mode);
            newScore = await scoreService.setScore(newScore);
            onSubmit(newScore); // Jei reikia informuoti tėvinį komponentą
            return { done: true };
        }
        
        return { done: false };
    };

    const [state, formAction, isPending] = useActionState<FormStatus, FormData>(actionCallback, {done: false});

    if (state.done) 
        return (<></>);

    return (
        <form action={formAction}>
            <input type="text" name="username" required placeholder="Enter username" />
            <button type="submit" disabled={isPending}>
                {isPending ? "Procesing..." : "Submit"}
            </button>
        </form>
    );

}

export default NewScore;