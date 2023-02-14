import { TestBed } from '@angular/core/testing';
import { LocalStorageUtils } from './localStorage';

describe('LocalStorageUtils', () => {
  let localStorageUtils: LocalStorageUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageUtils],
    });

    localStorageUtils = TestBed.inject(LocalStorageUtils);
  });

  it('should return the userId from local storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('10');
    expect(localStorageUtils.getUserId()).toBe('10');
  });

  it('should return an empty string when userId is not found in local storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(localStorageUtils.getUserId()).toBe('');
  });

  it('should return the token from local storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('token');
    expect(localStorageUtils.getToken()).toBe('token');
  });

  it('should return an empty string when token is not found in local storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(localStorageUtils.getToken()).toBe('');
  });

  it('should save the token to local storage', () => {
    spyOn(localStorage, 'setItem');
    localStorageUtils.saveToken('abc');
    expect(localStorage.setItem).toHaveBeenCalledOnceWith('token', 'abc');
  });

  it('should save the userId to local storage', () => {
    spyOn(localStorage, 'setItem');
    localStorageUtils.saveUserId('123');
    expect(localStorage.setItem).toHaveBeenCalledOnceWith('userId', '123');
  });

  it('should save the data from the response', () => {
    const response = {
      accessToken: 'accessToken',
      user: {
        id: 10,
      },
    };

    spyOn(localStorage, 'setItem');
    localStorageUtils.saveDataFromResponse(response);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'accessToken');
    expect(localStorage.setItem).toHaveBeenCalledWith('userId', '10');
  });

  it('should remove the token from local storage', () => {
    spyOn(localStorage, 'removeItem');
    localStorageUtils.removeToken();
    expect(localStorage.removeItem).toHaveBeenCalledOnceWith('token');
  });

  it('should remove the userId from local storage', () => {
    spyOn(localStorage, 'removeItem');
    localStorageUtils.removeUserId();
    expect(localStorage.removeItem).toHaveBeenCalledOnceWith('userId');
  });

  it('should remove the credentials from local storage', () => {
    spyOn(localStorage, 'removeItem');
    localStorageUtils.removeCredentials();
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('userId');
  });
});
