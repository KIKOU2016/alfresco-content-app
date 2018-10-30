/*!
 * @license
 * Alfresco Example Content Application
 *
 * Copyright (C) 2005 - 2018 Alfresco Software Limited
 *
 * This file is part of the Alfresco Example Content Application.
 * If the software was purchased under a paid Alfresco license, the terms of
 * the paid license agreement will prevail.  Otherwise, the software is
 * provided under the following open source license terms:
 *
 * The Alfresco Example Content Application is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The Alfresco Example Content Application is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

import {
  browser,
  element,
  by,
  ElementFinder,
  ExpectedConditions as EC
} from 'protractor';
import { BROWSER_WAIT_TIMEOUT, USE_HASH_STRATEGY } from './../configs';

export abstract class Page {
  private static locators = {
    app: 'app-root',
    layout: 'app-layout',
    overlay: '.cdk-overlay-container',
    dialogContainer: '.mat-dialog-container',
    snackBarContainer: '.cdk-overlay-pane .mat-snack-bar-container',
    snackBar: '.mat-simple-snackbar',
    snackBarAction: '.mat-simple-snackbar-action button',

    genericError: 'aca-generic-error',
    genericErrorIcon: 'aca-generic-error .mat-icon',
    genericErrorTitle: '.generic-error__title'
  };

  app: ElementFinder = browser.element(by.css(Page.locators.app));
  layout: ElementFinder = browser.element(by.css(Page.locators.layout));
  overlay: ElementFinder = browser.element(by.css(Page.locators.overlay));
  snackBar: ElementFinder = browser.element(by.css(Page.locators.snackBar));
  dialogContainer: ElementFinder = browser.element(by.css(Page.locators.dialogContainer));
  snackBarContainer: ElementFinder = browser.element(by.css(Page.locators.snackBarContainer));
  snackBarAction: ElementFinder = browser.element(by.css(Page.locators.snackBarAction));

  genericError: ElementFinder = browser.element(by.css(Page.locators.genericError));
  genericErrorIcon: ElementFinder = browser.element(by.css(Page.locators.genericErrorIcon));
  genericErrorTitle: ElementFinder = browser.element(by.css(Page.locators.genericErrorTitle));

  constructor(public url: string = '') {}

  getTitle() {
    return browser.getTitle();
  }

  load(relativeUrl: string = '') {
    const hash = USE_HASH_STRATEGY ? '/#' : '';
    const path = `${browser.baseUrl}${hash}${this.url}${relativeUrl}`;
    return browser.get(path);
  }

  waitForApp() {
    return browser.wait(EC.presenceOf(this.layout), BROWSER_WAIT_TIMEOUT);
  }

  waitForSnackBarToAppear() {
    return browser.wait(EC.presenceOf(this.snackBarContainer), BROWSER_WAIT_TIMEOUT, '------- timeout waiting for snackbar to appear');
    // return await browser.wait(until.elementLocated(by.css('.mat-snack-bar-container')), BROWSER_WAIT_TIMEOUT, 'wait for snackbar to appear');
  }

  async waitForSnackBarToClose() {
    await browser.wait(EC.not(EC.visibilityOf(this.snackBarContainer)), BROWSER_WAIT_TIMEOUT);
  }

  async waitForDialog() {
    await browser.wait(EC.visibilityOf(this.dialogContainer), BROWSER_WAIT_TIMEOUT);
  }

  async waitForDialogToClose() {
    await browser.wait(EC.not(EC.visibilityOf(this.dialogContainer)), BROWSER_WAIT_TIMEOUT);
  }

  async refresh() {
    await browser.refresh();
    await this.waitForApp();
  }

  getDialogActionByLabel(label) {
    return element(by.cssContainingText('.mat-button-wrapper', label));
  }

  async isSnackBarDisplayed() {
    return await this.snackBar.isDisplayed();
  }

  async getSnackBarMessage() {
    // await this.waitForSnackBarToAppear();
    const el = this.snackBar;
    return await el.getAttribute('innerText');
  }

  async clickSnackBarAction() {
    try {
      return await this.snackBarAction.click();
    } catch (e) {
      console.log(e, '.......failed on click snack bar action.........');
    }
  }

  async isGenericErrorDisplayed() {
    return await this.genericError.isDisplayed();
  }

  async getGenericErrorTitle() {
    return await this.genericErrorTitle.getText();
  }

}
