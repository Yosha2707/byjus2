import { Component, OnInit } from '@angular/core';
import { JobListService } from '../../services/job-list.service';
import { Response } from '@angular/http';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Experience: Array < any > ;
  Companies: Array < any > ;
  Location: Array < any > ;
  Skills: Array < any > ;
  TimeStamp: Array <any>;
  JobData: any;
  FilterArray: Array < any > ;
  TotalJobs: number;
  PageIndex: number;

  constructor(private jobService: JobListService) {}

  ngOnInit() {
    this.FilterArray = [];
    this.loadListData(null, null, null);
  }

  //removes duplicate value from array 
  getUnique(duplicate: Array < any > ) {
    var result = duplicate.filter(function (item, index, inputArray) {
      return inputArray.indexOf(item) == index && item != ""
    });
    return result;
  }

  loadListData(value: string, search_type: string, is_checked: Boolean) {
    this.jobService.getList().subscribe((resp: Response) => {
      //contains complete response from api 
      this.JobData = resp;

      //removing junk data 
      this.JobData.data = this.JobData.data.filter(e => {
        return e.companyname != "";
      })


      if(value == null){ //when page loads 
        var LocationArray = []
        var CompaniesArray = []
        var ExperienceArray = []
        var SkillArray = []
        var TimeStampArray = [];

        //seprate companies name , experience , locations etcc in an array , on which user can filter 
        this.JobData.data.filter(e => {
          return CompaniesArray.push(e.companyname) && LocationArray.push(e.location.split(",")) &&
            ExperienceArray.push(e.experience) && SkillArray.push(e.skills.split(",")) && TimeStampArray.push(formatDate(e.timestamp * 1000 , 'dd-MM-yy', 'en-US'))
        })
        LocationArray = [].concat.apply([], LocationArray);
        SkillArray = [].concat.apply([], SkillArray);
  
        this.Companies = this.getUnique(CompaniesArray)
        this.Location = this.getUnique(LocationArray)
        this.Experience = this.getUnique(ExperienceArray)
        this.Skills = this.getUnique(SkillArray)
        this.TimeStamp = this.getUnique(TimeStampArray)
      }else { //when user filter jobs 

        //FilterArray contains all the filter user is applying 
        var record = this.FilterArray
        
        if (is_checked) {
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
        this.FilterArray = record;
        for(var i = 0; i < this.FilterArray.length; i++){
          if (this.FilterArray[i].search_type == "experience") {
            this.JobData.data = this.JobData.data.filter(e => {
              var arrayEx = (e.experience).replace(' yrs', '')
              return arrayEx.replace(/\s/g, "") == (this.FilterArray[i].value).replace(' yrs', '')
            })
          } else if (this.FilterArray[i].search_type == "company_name") {
            this.JobData.data = this.JobData.data.filter(e => {
              return e.companyname == this.FilterArray[i].value
            })
          } else if (this.FilterArray[i].search_type == "location") {
            this.JobData.data = this.JobData.data.filter(e => {
              return e.location.indexOf(this.FilterArray[i].value) > -1
            })
          } else if (this.FilterArray[i].search_type == "skills") {
            this.JobData.data = this.JobData.data.filter(e => {
              return e.skills.indexOf(this.FilterArray[i].value) > -1
            })
          }
          else if (this.FilterArray[i].search_type == "timestamp") {
            this.JobData.data = this.JobData.data.filter(e => {
              return formatDate(e.timestamp * 1000 , 'dd-MM-yy', 'en-US') == this.FilterArray[i].value
            })
          }
        }
      }
      this.PageIndex = 1;
      this.TotalJobs = this.JobData.data.length;
      (error) => console.log(error)
    });

  }
}