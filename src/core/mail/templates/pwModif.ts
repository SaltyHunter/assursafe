import mjml2html from 'mjml';

function pwModif({ nickname }: { nickname: string }): string {
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
                Votre mot de passe à bien été modifié !
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

export default pwModif;