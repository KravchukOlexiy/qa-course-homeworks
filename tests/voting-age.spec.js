export function getVotingMessage(age){
    if (age < 0 || age.isInteger())
    if (age < 18) {
        return "Ви ще не можете голосувати."
    } else {
        return  "Ви можете голосувати."
    }
}

