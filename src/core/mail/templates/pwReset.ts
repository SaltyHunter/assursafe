import mjml2html from 'mjml';

function pwReset({ nickname, token }: { nickname: string; token: string }): string {
    const htmlOutput = mjml2html(
        `
      <mjml>
        <mj-body>
          <mj-section>
            <mj-column>
              <mj-text font-size="24px" font-weight="bold" color="#2386C8" font-family="helvetica">
                Bonjour ${nickname}!
              </mj-text>
              <mj-text font-size="20px" color="#2386C8" font-family="helvetica">
                Vous pouvez réinitialiser votre mot de passe ici : $(url)
              </mj-text>
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>
    `,
    );
    if (htmlOutput.html.length === 0) return '';
    return htmlOutput.html;
}

export default pwReset;