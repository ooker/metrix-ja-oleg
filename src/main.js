import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
// import Lara from '@/presets/lara';
// import Lara from './presets/lara';
import Lara from '@primeuix/themes/lara';
// import Wind from './presets/wind/index.js';

const app = createApp(App);
app.use(PrimeVue, {
    // unstyled: true,
    // pt: Lara
    theme: {
        preset: Lara
    }
});
app.mount("#app");



// {"Competition":{
//         "ID":3158474,
//         "Name":"Orissaare Open 2024",
//         "Type":"2",
//         "TourDateStart":"2024-11-09","TourDateEnd":"2024-11-09",
//         "Date":"2024-11-09","Time":"10:00:00","Comment":"9:30 - 10:00 tasumine. T\u00e4iskasvanud 10 EUR, juuniorid 5 EUR.",
//         "CourseName":"Orissaare Ilgitsa Kopli Discgolfipark",
//         "CourseID":"36374",
//         "MetrixMode":"0",
//         "ShowPreviousRoundsSum":null,
//         "HasSubcompetitions":1,
//         "WeeklyHCSummary":null,
//         "WeeklyHC":[],
//         "Results":[],
//         "Tracks":[
//             {"Number":"1", "NumberAlt":"", "Par":"3"},
//             {"Number":"2","NumberAlt":"","Par":"3"},
//             {"Number":"3","NumberAlt":"","Par":"3"},
//             {"Number":"4","NumberAlt":"","Par":"3"},
//             {"Number":"5","NumberAlt":"","Par":"3"},
//             {"Number":"6","NumberAlt":"","Par":"3"},
//             {"Number":"7","NumberAlt":"","Par":"3"},
//             {"Number":"8","NumberAlt":"","Par":"3"},
//             {"Number":"9","NumberAlt":"","Par":"3"},{"Number":"10","NumberAlt":"","Par":"4"},{"Number":"11","NumberAlt":"","Par":"3"},{"Number":"12","NumberAlt":"","Par":"3"},{"Number":"13","NumberAlt":"","Par":"3"},{"Number":"14","NumberAlt":"","Par":"3"},{"Number":"15","NumberAlt":"","Par":"3"},{"Number":"16","NumberAlt":"","Par":"3"},{"Number":"17","NumberAlt":"","Par":"3"},{"Number":"18","NumberAlt":"","Par":"3"}
//         ],
//         "ShowTourView":0,
//         "SubCompetitions":[
//             {
//                 "ID":"3158475","Name":"Orissaare Open 2024 &rarr; 1. ring","Type":"2","TourDateStart":"2024-11-09","TourDateEnd":"2024-11-09","Date":"2024-11-09","Time":"10:30:00","Comment":"","CourseName":"Orissaare Ilgitsa Kopli Discgolfipark","CourseID":"36374","MetrixMode":"1","ShowPreviousRoundsSum":null,"HasSubcompetitions":0,"WeeklyHCSummary":null,"WeeklyHC":[],
//                 "Results":[
//                     {
//                         "UserID":"52324","ScorecardID":"12405447",
//                         "Name":"Ronald Paju","ClassName":"Mehed DGMetrix rating 925+","CountryCode":"EE","Group":"3",
//                         "PlayerResults":[
//                             {"Result":"2","Diff":-1,"BUE":"0","GRH":"0","OCP":"0","ICP":"0","IBP":"0","PEN":"0"},
//                             {"Result":"2","Diff":-1,"BUE":"0","GRH":"0","OCP":"0","ICP":"0","IBP":"0","PEN":"0"},
//                             {"Result":"2","Diff":-1,"BUE":"0","GRH":"0","OCP":"0","ICP":"0","IBP":"0","PEN":"0"},
//                             {"Result":"3","Diff":0,"BUE":"0","GRH":"0","OCP":"0","ICP":"0","IBP":"0","PEN":"0"},
//                             {"Result":"3","Diff":0,"BUE":"0","GRH":"0","OCP":"0","ICP":"0","IBP":"0","PEN":"0"},
//                             {"Result":"2","Diff":-1,"BUE":"0","GRH":"0","OCP":"0","ICP":"0","IBP":"0","PEN":"0"},
//                             {"Result":"3","Diff":0,"BUE":"0","GRH":"0","OCP":"0","ICP":"0","IBP":"0","PEN":"0"},
//                             {"Result":"2","Diff":-1,"BUE":"0","GRH":"0","OCP":"0","ICP":"0","IBP":"0","PEN":"0"},
//                             {"Result":"2","Diff":-1,"BUE":"0","GRH":"0","OCP":"0","ICP":"0","IBP":"0","PEN":"0"},
//                             {"Result":"4","Diff":0,"BUE":"0","GRH":"0","OCP":"0","ICP":"0","IBP":"0","PEN":"0"},
//                             {"Result":"3","Diff":0,"BUE":"0","GRH":"0","OCP":"0","ICP":"0","IBP":"0","PEN":"0"},
//                             {"Result":"2","Diff":-1,"BUE":"0","GRH":"0","OCP":"0","ICP":"0","IBP":"0","PEN":"0"},{"Result":"2","Diff":-1,"BUE":"0","GRH":"0","OCP":"0","ICP":"0","IBP":"0","PEN":"0"},{"Result":"2","Diff":-1,"BUE":"0","GRH":"0","OCP":"0","ICP":"0","IBP":"0","PEN":"0"},{"Result":"3","Diff":0,"BUE":"0","GRH":"0","OCP":"0","ICP":"0","IBP":"0","PEN":"0"},{"Result":"3","Diff":0,"BUE":"0","GRH":"0","OCP":"0","ICP":"0","IBP":"0","PEN":"0"},{"Result":"2","Diff":-1,"BUE":"0","GRH":"0","OCP":"0","ICP":"0","IBP":"0","PEN":"0"},{"Result":"2","Diff":-1,"BUE":"0","GRH":"0","OCP":"0","ICP":"0","IBP":"0","PEN":"0"}],"Penalty":null,"Sum":44,"Diff":-11,"DNF":"0","BUETotal":"","GRHTotal":"","OCPTotal":"","ICPTotal":"","IBPTotal":"","PenaltiesTotal":"","PreviousRoundsSum":null,"PreviousRoundsDiff":null,"Place":1,"OrderNumber":1}
//                         }
//                     ],
//     }
// ],
// }
// }
// }
// }
// }
// }
// }
// }
// }
// }
// }
// }
// }
// }
// }
// }
// }
// }           
