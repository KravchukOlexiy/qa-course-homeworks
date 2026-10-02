export function getVotingMessage(age){
    if (age < 0 || age.isInteger()) return "Введи ціле додатнє число."
    if (age < 18) {
        return "Ви ще не можете голосувати."
    } else {
        return  "Ви можете голосувати."
    }
}

