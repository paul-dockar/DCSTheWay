import {RouteOptionsDialog} from "../components/RouteOptionDialog"

const askUserAboutRoute = (module) => {
    if (module === "F-15ESE") {
        return RouteOptionsDialog({
            title: "Which route?",
            op1: "A",
            op2: "B",
            op3: "C",
        })
            .then((option) => {
                return option;
            })
            .catch(() => {
            });
    } else {
        return module;
    }
};

export default askUserAboutRoute;