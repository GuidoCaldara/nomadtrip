const generateCardHeadline = (step, minDays, maxDays) =>{
  switch (step) {
    case 1:
      return {
      title: "First Step",
      subtitle: "Let's start selecting the dates of your trip. Choose a range of dates for your departure and a range for your return"
    }
      case 2:
      return {
        title: `Cool! You'll have from ${minDays} to ${maxDays} on the trip. Let's set the itinerary`,
        subtitle: "Enter all the cities you'd like to visit during your trip. Choose the minimum and the maximum amount of days you'd like to spend there. We'll calculate the best air fare"
      }
      case 3:
        return{
          title: "Departure and return",
          subtitle: "Choose where you'd like to start and end your trip."
        }
      case 4:
        return{
          title:"How many Passengers?",
          subtitle: null
        }
      default:
      break
  }
}


export { generateCardHeadline }