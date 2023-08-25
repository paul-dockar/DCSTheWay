import { BreakfastDining } from "@mui/icons-material";

class f15e {
    static slotVariant = ''
    static routeVariant = ''
    static #f15eNumberCodes = {
        "0": 3036,
        "1": 3020,  //A
        "2": 3021,  //N
        "3": 3022,  //B
        "4": 3025,  //W
        "5": 3026,  //M
        "6": 3027,  //E
        "7": 3030,
        "8": 3031,  //S
        "9": 3032   //C
    };

    static createButtonCommands(waypoints) {
        let f15eUFCDevice;
        if (this.slotVariant === "F-15ESE_pilot") {
            f15eUFCDevice = 56;
        } else {
            f15eUFCDevice = 57;
        }

        let chosenRoute;
        switch (this.routeVariant) {
            default:
            case "A": 
                chosenRoute = this.#f15eNumberCodes[1];
                break;
            case "B": 
                chosenRoute = this.#f15eNumberCodes[3];
                break;
            case "C": 
                chosenRoute = this.#f15eNumberCodes[9];
                break;
        }

        let delay = 100;
        {
            let payload = [
                { // Clear UFC button
                    device: f15eUFCDevice,
                    code: 3035,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Clear UFC button
                    device: f15eUFCDevice,
                    code: 3035,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Clear UFC button
                    device: f15eUFCDevice,
                    code: 3035,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Menu UFC button
                    device: f15eUFCDevice,
                    code: 3038,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Press Shift
                    device: f15eUFCDevice,
                    code: 3033,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Press 3 / B
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[3],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Enter B into UFC button 10
                    device: f15eUFCDevice,
                    code: 3010,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Press UFC button 10
                    device: f15eUFCDevice,
                    code: 3010,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                }
            ];
            for (const waypoint of waypoints) {
                let waypointNumber = waypoints.indexOf(waypoint) + 1;
                for (let i = 0; i < (waypointNumber + '').length; i++) {
                    // eslint-disable-next-line default-case
                    let digit = (waypointNumber + '').charAt(i);
                    payload.push({
                        device: f15eUFCDevice,
                        code: this.#f15eNumberCodes[digit],
                        delay: delay,
                        activate: 1,
                        addDepress: "true",
                    });
                }

                payload.push({ // Press Shift
                    device: f15eUFCDevice,
                    code: 3033,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                });

                payload.push({ // Press A, B or C route variant
                    device: f15eUFCDevice,
                    code: chosenRoute,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                });

                payload.push({ // Press PB 1
                    device: f15eUFCDevice,
                    code: 3001,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                });

                payload.push({ // Press Shift
                    device: f15eUFCDevice,
                    code: 3033,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                });

                if (waypoint.latHem === "N") { // North
                    payload.push({
                        device: f15eUFCDevice,
                        code: this.#f15eNumberCodes[2],
                        delay: delay,
                        activate: 1,
                        addDepress: "true",
                    });
                } else {
                    payload.push({ // South
                        device: f15eUFCDevice,
                        code: this.#f15eNumberCodes[8],
                        delay: delay,
                        activate: 1,
                        addDepress: "true",
                    });
                }

                //Type lat
                for (let i = 0; i < waypoint.lat.length; i++) { // enter each digit of lat into scratchpad
                    // eslint-disable-next-line default-case
                    for (const char of waypoint.lat.charAt(i)) {
                        if (char !== ".") {
                            payload.push({
                                device: f15eUFCDevice,
                                code: this.#f15eNumberCodes[char],
                                delay: delay,
                                activate: 1,
                                addDepress: "true",
                            });
                        }
                    }
                }

                payload.push({ // enter latitutde into UFC
                    device: f15eUFCDevice,
                    code: 3002,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                });

                payload.push({ // Press Shift
                    device: f15eUFCDevice,
                    code: 3033,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                });

                if (waypoint.longHem === "E") { // Type hemisphere into scratchpad
                    payload.push({
                        device: f15eUFCDevice,
                        code: this.#f15eNumberCodes[6],
                        delay: delay,
                        activate: 1,
                        addDepress: "true",
                    });
                } else {
                    payload.push({
                        device: f15eUFCDevice,
                        code: this.#f15eNumberCodes[4],
                        delay: delay,
                        activate: 1,
                        addDepress: "true",
                    });
                }

                for (let i = 0; i < waypoint.long.length; i++) { // enter each digit of longtitude into scratchpad
                    // eslint-disable-next-line default-case
                    for (const char of waypoint.long.charAt(i)) {
                        if (char !== ".") {
                            payload.push({
                                device: f15eUFCDevice,
                                code: this.#f15eNumberCodes[char],
                                delay: delay,
                                activate: 1,
                                addDepress: "true",
                            });
                        }
                    }
                }

                payload.push({ // enter longtitude into UFC
                    device: f15eUFCDevice,
                    code: 3003,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                });

                for (let i = 0; i < waypoint.elev.length; i++) { // enter each digit of elevation into scratchpad
                    // eslint-disable-next-line default-case
                    for (const char of waypoint.elev.charAt(i)) {
                        payload.push({
                            device: f15eUFCDevice,
                            code: this.#f15eNumberCodes[char],
                            delay: delay,
                            activate: 1,
                            addDepress: "true",
                        });
                    }
                }

                payload.push({ // enter elevation into UFC
                    device: f15eUFCDevice,
                    code: 3007,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                });
            }
            payload.push({ // Menu UFC button
                    device: f15eUFCDevice,
                    code: 3038,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Type 1 into UFC
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[1],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // press shift
                    device: f15eUFCDevice,
                    code: 3033,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Press A, B or C route variant
                    device: f15eUFCDevice,
                    code: chosenRoute,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Waypoint UFC button
                    device: f15eUFCDevice,
                    code: 3010,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },);

            return payload;
        }
    }
}
export default f15e