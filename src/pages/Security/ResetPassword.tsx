import { ResetPasswordModal } from "@components/molecules";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      setIsModalOpen(true);
    }
  }, [token]);

  return (
    <>
      {token ? (
        <ResetPasswordModal
          token={token}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            navigate("/");
          }}
        />
      ) : (
        navigate("/forgot-password")
      )}
    </>
  );
};

export default ResetPassword;
