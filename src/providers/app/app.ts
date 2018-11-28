import { Injectable } from '@angular/core';

import { Logger } from '../../providers/logger/logger';

// providers
import { ConfigProvider } from '../../providers/config/config';
import { LanguageProvider } from '../../providers/language/language';
import { PersistenceProvider } from '../../providers/persistence/persistence';

import * as APP_INFO from '../../assets/appConfig.json';
import * as EXTERNAL_SERVICES_INFO from '../../assets/externalServices.json';

/* TODO: implement interface properly
interface App {
  packageName: string;
  packageDescription: string;
  packageNameId: string;
  themeColor: string;
  userVisibleName: string;
  purposeLine: string;
  bundleName: string;
  appUri: string;
  name: string;
  nameNoSpace: string;
  nameCase: string;
  nameCaseNoSpace: string;
  gitHubRepoName: string;
  gitHubRepoUrl: string;
  gitHubRepoBugs: string;
  disclaimerUrl: string;
  url: string;
  appDescription: string;
  winAppName: string;
  WindowsStoreIdentityName: string;
  WindowsStoreDisplayName: string;
  windowsAppId: string;
  pushSenderId: string;
  description: string;
  version: string;
  androidVersion: string;
  commitHash: string;
  _extraCSS: string;
  _enabledExtensions;
}*/

@Injectable()
export class AppProvider {
  public info: any = {};
  public servicesInfo;

  constructor(
    private logger: Logger,
    private language: LanguageProvider,
    public config: ConfigProvider,
    private persistence: PersistenceProvider
  ) {
    this.logger.debug('AppProvider initialized');
  }

  public async load() {
    this.getInfo();
    await Promise.all([this.loadProviders()]);
  }

  private getInfo() {
    this.info = APP_INFO;
    this.servicesInfo = EXTERNAL_SERVICES_INFO;
  }

  private async loadProviders() {
    this.persistence.load();
    await this.config.load();
    this.language.set(this.info.defaultLanguage);
    this.language.load();
  }
}
