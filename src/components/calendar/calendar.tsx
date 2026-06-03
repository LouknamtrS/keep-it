import { mockRecords } from "../../mocks/records";
import RecordCalendar from "./recordCalendar";

export default function Calendar (){
    return(
        <>
            <RecordCalendar
                records={mockRecords}
            />
        </>
    );
}