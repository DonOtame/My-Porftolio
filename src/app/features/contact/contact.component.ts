import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { bootstrapClipboard2, bootstrapGithub, bootstrapLinkedin } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-contact',
  imports: [TranslatePipe, NgIcon],
  viewProviders: [provideIcons({ bootstrapGithub, bootstrapLinkedin, bootstrapClipboard2 })],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactComponent {
  private translate = inject(TranslateService);

  copyEmail(emailKey: string) {
    const email = this.translate.instant(emailKey);
    navigator.clipboard
      .writeText(email)
      .then(() => {
        console.log('Correo copiado al portapapeles');
      })
      .catch((err) => {
        console.error('Error al copiar correo:', err);
      });
  }
}
