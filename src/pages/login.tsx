import { TextInput } from "@/components/global/TextInput";
import { Logo } from "@/components/global/Logo";
import { Button } from "@/components/global/Button";
import { Division } from "@/components/global/Division";
import { Info } from "@/components/global/Info";
import { HelpText } from "@/components/global/HelpText";
import { useLoginForm } from "@/hooks/useLoginForm";
import { colors } from "@/styles/colors";

export default function Login() {
  const { formState, updateField, handleSubmit } = useLoginForm();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: colors.background.page }}>
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <Logo width={175} height={175} shape="circle" />
        </div>
        <Division variant="default" className="space-y-8">
          <Info 
            message={formState.infoMessage} 
            type={formState.infoType}
            show={formState.showInfo}
          />
          <TextInput
            label="Email"
            type="email"
            placeholder="Entrez votre email"
            value={formState.email}
            onChange={(value) => updateField("email", value)}
            required
            data-cy="email-input"
          />
          <div className="space-y-2">
            <TextInput
              label="Mot de passe"
              type="password"
              placeholder="Entrez votre mot de passe"
              value={formState.password}
              onChange={(value) => updateField("password", value)}
              required
              data-cy="password-input"
            />
            <HelpText
              text="Mot de passe oublié ?"
              linkText="Cliquez ici"
              linkHref="/forgot-password"
              className="text-left"
            />
          </div>
          <Button
            text="Se connecter"
            variant="primary"
            onClick={handleSubmit}
            data-cy="login-button"
          />
          <div className="space-y-4 text-center">
            <HelpText
              text="Vous avez besoin d'aide ?"
              linkText=""
              linkHref="#"
              isBold={true}
            />
            <HelpText
              text="Pas encore inscrit ?"
              linkText="Créez un compte ici"
              linkHref="/inscription"
            />
            <HelpText
              text="Un autre soucis ?"
              linkText="Contactez le support"
              linkHref="/support"
            />
          </div>
        </Division>
      </div>
    </div>
  );
} 