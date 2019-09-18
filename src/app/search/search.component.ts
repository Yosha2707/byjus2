import {
  Component,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import {
  job
} from '../pipes/search';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl
} from '@angular/forms';
import {
  JobListService
} from '../job-list.service';
import {
  Headers,
  Response
} from '@angular/http';
import {
  ToastaService
} from 'ngx-toasta';

import { formatDate  } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  jobList: FormGroup;
  searchForm: FormGroup;
  joblocation: string = "Job Location";
  pageData: any;
  Experience: Array < any > ;
  Companies: Array < any > ;
  Location: Array < any > ;
  Skills: Array < any > ;
  timeStamp: Array <any>;
  jobdata: any;
  filterArray: Array < any > ;
  totaljobs: number;
  Pageindex: number;
  ExperienceFormArray: FormArray;
  CompanyFormArray: FormArray;
  LocationFormArray: FormArray;
  unselectedExperience: any;
  unselectedCompany: any;
  unselectedLocation: any;
  checklist;
  constructor(private fb: FormBuilder, private jobservice: JobListService, public toastr: ToastaService, vcr:
    ViewContainerRef) {
    this.pageData = new Array < any > ();
   // this.toastr.setRootViewContainerRef(vcr);

  }

  ngOnInit() {
    this.filterArray = [];
    this.loadListData(null, null, null);
    this.jobList = this.fb.group({
      jobDays: this.fb.array([]),
      jobType: this.fb.array([]),
      experience: this.fb.array([]),
      company: this.fb.array([]),
      location: this.fb.array([]),
      checkboxesname: this.fb.array([])
    });
    this.searchForm = this.fb.group({
      designation: '',
      locationC: '',
      key: ''
    });
    // this.toastr.success('Correct UserName and Password!', 'SignIn Successfull',{toastLife: 2000});
  }

  getUnique(duplicate: Array < any > ) {
    var result = duplicate.filter(function (item, index, inputArray) {
      return inputArray.indexOf(item) == index;
    });
    return result;
  }

  loadListData(value: string, search_type: string, isChecked: Boolean) {
    this.jobservice.getList().subscribe((resp: Response) => {
      this.jobdata = resp;
      this.jobdata.data = this.jobdata.data.filter(e => {
        return e.companyname != "";
      })
      if(value == null){
        var locationArray = []
        var CompaniesArray = []
        var ExperienceArray = []
        var SkillArray = []
        var timeStampArray = [];
        this.jobdata.data.filter(e => {
          return CompaniesArray.push(e.companyname) && locationArray.push(e.location.split(",")) &&
            ExperienceArray.push(e.experience) && SkillArray.push(e.skills.split(",")) && timeStampArray.push(formatDate(e.timestamp * 1000 , 'dd-MM-yy', 'en-US'))
        })
        locationArray = [].concat.apply([], locationArray);
        SkillArray = [].concat.apply([], SkillArray);
  
        this.Companies = this.getUnique(CompaniesArray)
        this.Location = this.getUnique(locationArray)
        this.Experience = this.getUnique(ExperienceArray)
        this.Skills = this.getUnique(SkillArray)
        this.timeStamp = this.getUnique(timeStampArray)
      }else {
        var record = this.filterArray
        if (isChecked) {
          record.push({
            search_type: search_type,
            value: value
          })
        } else {
          record.filter(function(e , i){
            if(e.value == value){
              record.splice(i, 1)
            }
          })
        }
        this.filterArray = record;
        for(var i = 0; i < this.filterArray.length; i++){
          if (this.filterArray[i].search_type == "experience") {
            this.jobdata.data = this.jobdata.data.filter(e => {
              var arrayEx = (e.experience).replace(' yrs', '')
              return arrayEx.replace(/\s/g, "") == (this.filterArray[i].value).replace(' yrs', '')
            })
          } else if (this.filterArray[i].search_type == "company_name") {
            this.jobdata.data = this.jobdata.data.filter(e => {
              return e.companyname == this.filterArray[i].value
            })
          } else if (this.filterArray[i].search_type == "location") {
            this.jobdata.data = this.jobdata.data.filter(e => {
              return e.location.indexOf(this.filterArray[i].value) > -1
            })
          } else if (this.filterArray[i].search_type == "skills") {
            this.jobdata.data = this.jobdata.data.filter(e => {
              return e.skills.indexOf(this.filterArray[i].value) > -1
            })
          }
          else if (this.filterArray[i].search_type == "timestamp") {
            this.jobdata.data = this.jobdata.data.filter(e => {
              return formatDate(e.timestamp * 1000 , 'dd-MM-yy', 'en-US') == this.filterArray[i].value
            })
          }
        }
      }
      this.Pageindex = 1;
      this.totaljobs = this.jobdata.data.length;
      (error) => console.log(error)
    });

  }
}