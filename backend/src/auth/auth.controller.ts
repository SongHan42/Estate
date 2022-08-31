import { Controller, Get, Header, Res, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly kakaoLogin: AuthService) {}

  @Get('kakaoLogin')
  @Header('Content-Type', 'text/html')
  getKakaoLoginPage(): string {
    return `
      <div>
        <h1>카카오 로그인</h1>
        <form action="/auth/kakaoLoginLogic" method="GET">
          <input type="submit" value="카카오로그인" />
        </form>
        <form action="/auth/kakaoLogout" method="GET">
          <input type="submit" value="카카오로그아웃 및 연결 끊기" />
        </form>
      </div>
    `;
  }

  @Get('kakaoLoginLogic')
  @Header('Content-Type', 'text/html')
  kakaoLoginLogic(@Res() res): void {
    const _hostName = 'https://kauth.kakao.com';
    const _restApiKey = 'ddc876cb236f2a4bfe7d65d8bf9fa61b'; // * 입력필요
    // 카카오 로그인 RedirectURI 등록}
    const _redirectUrl: string = process.env.CB_URI + 'kakaoLoginLogicRedirect';
    const url = `${_hostName}/oauth/authorize?client_id=${_restApiKey}&redirect_uri=${_redirectUrl}&response_type=code`;
    return res.redirect(url);
  }

  @Get('kakaoLoginLogicRedirect')
  @Header('Content-Type', 'text/html')
  kakaoLoginLogicRedirect(@Query() qs, @Res() res): void {
    console.log(qs.code);
    const _restApiKey = 'ddc876cb236f2a4bfe7d65d8bf9fa61b'; // * 입력필요
    const _redirect_uri: string =
      process.env.CB_URI + 'kakaoLoginLogicRedirect';
    const _hostName = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${_restApiKey}&redirect_uri=${_redirect_uri}&code=${qs.code}`;
    const _headers = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };
    this.kakaoLogin
      .login(_hostName, _headers)
      .then((e) => {
        console.log(`TOKEN : ${e.data['access_token']}`);
        this.kakaoLogin.setToken(e.data['access_token']);
        return res.send(`
          <div>
            <h2>축하합니다!</h2>
            <p>카카오 로그인 성공하였습니다 :)</p>
            <a href="/kakaoLogin">메인으로</a>
          </div>
        `);
      })
      .catch((err) => {
        console.log(err);
        return res.send('error');
      });
  }
  @Get('kakaoLogout')
  kakaoLogout(@Res() res): void {
    console.log(`LOGOUT TOKEN : ${this.kakaoLogin.accessToken}`);
    // // 로그아웃 -(1) 연결 끊기
    this.kakaoLogin
      .deleteLog()
      .then((e) => {
        return res.send(`
          <div>
            <h2>로그아웃 완료(연결끊기)</h2>
            <a href="/kakaoLogin">메인 화면으로</a>
          </div>
        `);
      })
      .catch((e) => {
        console.log(e);
        return res.send('DELETE ERROR');
      });
    // // 로그아웃 -(2) 토큰 만료
    // this.kakaoLogin
    //   .logout()
    //   .then((e) => {
    //     return res.send(`
    //       <div>
    //         <h2>로그아웃 완료(토큰만료)</h2>
    //         <a href="/kakaoLogin">메인 화면으로</a>
    //       </div>
    //     `);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     return res.send('LogOUT ERROR');
    //   });
  }
}
