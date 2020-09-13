import { Component, OnInit } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { Store } from '@ngrx/store';
import { loadPosts } from './store/post/post.actions';
import { loadCompanys } from './store/company/company.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private store: Store
  ) {
    this.translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }

  ngOnInit(): void {
    this.store.dispatch(loadPosts());
    this.store.dispatch(loadCompanys());
  }

  minimize(): void {
    this.electronService.remote.getCurrentWindow().minimize();
  }

  maximize(): void {
    const win = this.electronService.remote.getCurrentWindow();
    win.isMaximized() ? win.unmaximize() : win.maximize();
  }

  close(): void {
    this.electronService.remote.getCurrentWindow().close();
  }
}
