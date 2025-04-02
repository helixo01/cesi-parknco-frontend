import { FormInput } from "@/components/global/FormInput";
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
          <div className="space-y-2">
            <div className="text-base font-medium" style={{ color: colors.text.label }}>
              Email <span className="text-red-500">*</span>
            </div>
            <div className="relative">
              <input
                type="email"
                placeholder="Entrez votre email"
                value={formState.email}
                onChange={(e) => updateField("email", e.target.value)}
                required
                className="w-full px-4 py-2 bg-transparent border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  borderColor: colors.text.label,
                  color: colors.text.white,
                }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-base font-medium" style={{ color: colors.text.label }}>
              Mot de passe <span className="text-red-500">*</span>
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="Entrez votre mot de passe"
                value={formState.password}
                onChange={(e) => updateField("password", e.target.value)}
                required
                className="w-full px-4 py-2 bg-transparent border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  borderColor: colors.text.label,
                  color: colors.text.white,
                }}
              />
            </div>
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