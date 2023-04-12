export const getCurrentFinancialYear = () => {
	var fiscalyear = "";
	var today = new Date();
	if ((today.getMonth() + 1) <= 3) {
        fiscalyear = (today.getFullYear() - 1) + "-" + (today.getFullYear().toString()).slice(0,2)
        // console.log("fiscalyear",fiscalyear)
	} else {
        fiscalyear = today.getFullYear() + "-" + ((today.getFullYear() + 1).toString()).slice(2,4)
	}
	return fiscalyear
  }

  export const getFinalcialQuarterRange = () => {
    var today = new Date();
    var month = today.getMonth() + 1;
    var value = Math.ceil(month / 3);
    switch (value) {
        case 1:
            return "Q1 (Jan - Mar)";
        case 2:
            return "Q2 (Apr - Jun)";
        case 3:
            return "Q3 (Jul - Sep)";
        case 4:
            return "Q4 (Oct - Dec)";
        default:
            return "Q1 (Jan - Mar)";
    }
}