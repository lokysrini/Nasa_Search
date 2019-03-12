import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonService } from './common.service'
declare var jquery: any;
declare var $: any;
declare var particlesJS: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public fullData: any = [];
  public showSpinner = false;
  public resList;
  public suggestion;
  public searchSuggestions = ["moon", "star", "sky", "mars", "satelite"];
  public suggestionResults = [];
  public years = [];
  public start = 1920;
  public end = 2019;
  selectedYear;
  isNext: boolean = false;
  isPrev: boolean = false;
  currentPageNum = 1;
  constructor(public list: CommonService, public cd: ChangeDetectorRef) {
    this.list.data.subscribe(res => {
      this.fullData = res;
      this.showSpinner = false;
    });
    this.list.pageOption.subscribe(res => {
      if (res && res.length > 1) {
        this.isNext = true;
        this.isPrev = true;
      } else {
        if (res && res.length && res[0].prompt == "Next") {
          this.isNext = true;
          this.isPrev = false;
        }
        else if (res && res.length && res[0].prompt == "Previous") {
          this.isNext = false;
          this.isPrev = true;
        } else {
          this.isNext = false;
          this.isPrev = false;
        }
      }
    })
  }

  ngOnInit() {
    this.createYearList()
    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 700
          }
        },
        "color": {
          "value": ["#aa73ff", "#f8c210", "#83d238", "#33b1f8"]
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },

          "polygon": {
            "nb_sides": 5
          }
        },


        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },


        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 30,
            "size_min": 0.1,
            "sync": false
          }
        },


        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },

        "move": {
          "enable": true,
          "speed": 3,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },



      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },

          "onclick": {
            "enable": true,
            "mode": "push"
          },

          "resize": true
        },

        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },


          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },

          "repulse": {
            "distance": 200,
            "duration": 0.4
          },

          "push": {
            "particles_nb": 4
          },

          "remove": {
            "particles_nb": 2
          }
        }
      },



      "retina_detect": true
    });
  }

  public createYearList() {
    let n = 1920;
    do {
      this.years.push(n);
      n++;
    } while (n < 2020)
  }

  public searchCustomers(event): void {
    this.suggestionResults = this.searchSuggestions.filter(c => c.startsWith(event.query));
  }

  public getSelected(val) {
    this.showSpinner = true;
    this.fullData = this.list.get_products(this.currentPageNum, val, this.start, this.end);
  }

  public pageNext() {
    this.currentPageNum++;
    this.showSpinner = true;
    this.fullData = this.list.get_products(this.currentPageNum, this.suggestion, this.start, this.end);
  }
  public pagePrev() {
    if (this.currentPageNum > 1) this.currentPageNum--;
    this.showSpinner = true;
    this.fullData = this.list.get_products(this.currentPageNum, this.suggestion, this.start, this.end);
  }


}
