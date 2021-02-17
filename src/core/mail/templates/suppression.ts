/* eslint-disable prettier/prettier */
import mjml2html from 'mjml';

function suppression({ username }: { username: string }): string {
    const htmlOutput = mjml2html(
        `
        <mjml>
          <mj-body>
            <mj-section>
              <mj-column>
                <mj-text font-size="24px" font-weight="bold" color="rgba(101,225,87,1)" font-family="helvetica">
                  Merci d'avoir utilisé AssurSafe : ${username}.
                </mj-text>
                <mj-text font-size="20px" color="rgba(101,225,87,1)" font-family="helvetica">
                  Votre compte à bien été supprimé !
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

export default suppression;