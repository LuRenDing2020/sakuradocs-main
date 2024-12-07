import { Section, Text } from '@react-email/components';
import * as React from 'react';
import { content, paragraph } from '../css/styles';
import { MailBody } from '../partials/partials';

interface Props {
  invitedUserName: string;
  invitedUserEmail: string;
}

export const InvitationAcceptedEmail = ({
  invitedUserName,
  invitedUserEmail,
}: Props) => {
  return (
    <MailBody>
      <Section style={content}>
        <Text style={paragraph}>您好！</Text>
        <Text style={paragraph}>
          {invitedUserName} ({invitedUserEmail}) 同意了您的邀请！
        </Text>
      </Section>
    </MailBody>
  );
};

export default InvitationAcceptedEmail;
