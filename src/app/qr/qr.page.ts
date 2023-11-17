import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  title = 'qr-reader';
  public cameras:MediaDeviceInfo[]=[];
  public myDevice!: MediaDeviceInfo;
  public scannerEnabled=false;
  public results:string[]=[];

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  

  camerasFoundHandler(cameras: MediaDeviceInfo[]){
    this.cameras=cameras;
    this.selectCamera(this.cameras[0].label);
  }

  scanSuccessHandler(event: string) {
    console.log(event);
    this.results.unshift(event);
    this.checkAndNavigate(); 
  }


  selectCamera(cameraLabel: string){
    this.cameras.forEach(camera=>{
      if(camera.label.includes(cameraLabel)){
        this.myDevice=camera;
        console.log(camera.label);
        this.scannerEnabled=true;
      }
    })    
}
  private checkAndNavigate() {
    if (this.results.length > 0) {
      const result = this.results[0]; 
      console.log(result);
      

      this.router.navigate(['/clase'], { queryParams: { result: result } });
    }
  }



  ngOnInit() {
  }

}
