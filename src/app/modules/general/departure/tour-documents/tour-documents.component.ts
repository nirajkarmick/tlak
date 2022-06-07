import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { CommunicationService } from "../../../../services/communication.service";
import { TranslateConfigService } from "../../../../services/translate-config.service";

declare let $: any;

@Component({
  selector: 'app-tour-documents',
  templateUrl: './tour-documents.component.html',
  styleUrls: ['./tour-documents.component.css']
})
export class TourDocumentsComponent implements OnInit {
  credentials = { document_name: "", tour_file: "" };
  files: any;
  package_id: any;
  AddTourDoc: FormGroup;
  isSubmitted = false;

  constructor(
    private ReactiveFormsModule: ReactiveFormsModule,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private CommunicationService: CommunicationService,
    private http: HttpClient,
    private toastr: ToastrService,
    private translate: TranslateConfigService
  ) {
    this.AddTourDoc = this.formBuilder.group({
      name: ["", Validators.required],
      docFiles: [],
      fileExtn: []
    });

    this.package_id = this.route.snapshot.queryParams['package_id'];
    if (this.package_id === undefined) {
      alert('Package not found!');
      this.router.navigateByUrl('/departure-create');
    } else {
      this.render_data();
    }
  }

  TourDoc: any;
  TourDocALL: any;
  url: any;
  Docfilename: any = [];
  MultipuleDoc: any = [];

  render_data() {
    this.MultipuleDoc = [];
    this.imageName=[];
    this.CommunicationService.TourDoc(this.package_id).subscribe((res: any) => {
      this.TourDoc = res.data.traveldocs;
      /*this.MultipuleDoc = res.data.traveldocs.documents;*/
      //this.TourDocALL = res.data.traveldocsPdfall;
      this.url = res.data.DocSRCPath;
      console.log(res);
      /*if (this.TourDoc && this.TourDoc.length > 0) {
        for (let i = 0; i < this.TourDoc.length; i++) {
          this.Docfilename.push(this.TourDoc[i]);
          var fileExt = this.Docfilename.toString().split('.').pop();
        }
      }*/
      /*console.log(this.Docfilename,'Tour DOc')
      console.log(this.MultipuleDoc,'File List')*/
      //var fileExt = Docfilename.split('.').pop();
    });
  }

  ngOnInit(): void {
  }

  imageName: any = [];
  allDoc: any = [];
  incusionForm = new FormData();
  filePath: any;
  fileExtName: any = [];
  fileSize: any;
  filesizeLimit: any;

  filename(files: any) {
    this.allDoc = [];
    this.imageName = [];
    //console.log(files.target.files)
    for (let i = 0; i < files.target.files.length; i++) {
      //const file = files.target.files[i];
      const file = (files.target).files[i];
      console.log(file)
      this.fileSize = file.size; 
      this.filesizeLimit = 5009122; //5 MB validation
      var extName = file.name.toString().split('.').pop();
      var _validFileExtensions = ["jpg", "jpeg", "png", "csv", "xls", "doc", "docx", "pdf"];
      var ext_found = _validFileExtensions.indexOf(extName);
      if (ext_found < 0) {
        this.allDoc = [];
        this.imageName = [];
        //alert('jpg, jpeg, png, csv,xls,doc,docx,pdf format supported');
        this.toastr.error('jpg, jpeg, png, csv,xls,doc,docx,pdf format supported');
        return;
      }
      
      if (this.fileSize > this.filesizeLimit) {
        this.toastr.error('File is too large. Maximum size allowed is 5 MB');
        return;
      }
      this.imageName.push(file.name);
      this.fileExtName.push(this.imageName.toString().split('.').pop());

      this.incusionForm.set("image", file);
      getBase64(files.target.files[i], extName);
    }
    console.log(this.fileExtName, 'sdfasjdasd')
    let that = this;

    function getBase64(file: any, ext: any) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e: any) {
        that.allDoc.push({ 'base': reader.result, 'ext': ext });
        console.log(that.allDoc);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }

  get form() {
    return this.AddTourDoc.controls;
  }

  TourDocument() {
    console.log(this.AddTourDoc);
    this.isSubmitted = true;
    // if (this.allDoc.length == 0) {
    //   alert('Please upload Document')
    //   return;
    // }
    if (this.AddTourDoc.invalid) {
      return
    } else {
      //this.incusionForm.set("name", this.AddTourDoc.value);
      this.AddTourDoc.patchValue({ docFiles: this.allDoc, fileExtn: this.fileExtName })
      console.log(this.AddTourDoc.value);
      this.CommunicationService.TourUpload(this.package_id, this.AddTourDoc.value).subscribe((res: any) => {
        console.log(res);
        this.toastr.success(res.message);
        this.AddTourDoc.reset();
        this.isSubmitted = false;
        this.render_data();
      })

    }
  }

  docName: any;
  docId: any;

  deleteOpenpop(id: any, name: any) {
    this.docName = name
    this.docId = id;
  }

  deletedoc(docId: any) {
    console.log(this.docId)
    this.CommunicationService.deleteDoc(this.docId).subscribe((res: any) => {
      this.toastr.success(res.success);
      this.render_data();
    }, (error) => {
      //this.toastr.error(res.message);
      alert("some thing went wrong");
    })
  }
}
