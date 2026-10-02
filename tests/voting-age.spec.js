export function getVotingMessage(age){
    if (age < 0 || Number.isInteger(age)) return "Введи ціле додатнє число."
    if (age < 18) {
        return "Ви ще не можете голосувати."
    } else {
        return  "Ви можете голосувати."
    }
}

