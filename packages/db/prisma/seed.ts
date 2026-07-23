import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Iniciando seed do banco...\n');

    // Limpar dados existentes (respeitando ordem de foreign keys)
    await prisma.activityLog.deleteMany();
    await prisma.caseUpdate.deleteMany();
    await prisma.sentEmail.deleteMany();
    await prisma.document.deleteMany();
    await prisma.legalCase.deleteMany();
    await prisma.intakeForm.deleteMany();
    await prisma.client.deleteMany();
    await prisma.user.deleteMany();

    console.log('✓ Dados anteriores removidos\n');

    // Criar Users
    const admin = await prisma.user.create({
        data: {
            name: 'Administrador Sistema',
            email: 'admin@monteiro.adv.br',
            passwordHash: '$2b$10$MYwW1V9PboQmKSvMM9hKIeyLKqH3hXuUkJyM4h7v0OIBqCzgJ6RDW', // 123456
            role: 'ADMIN',
            isActive: true,
        },
    });

    const lawyer1 = await prisma.user.create({
        data: {
            name: 'Dr. Carlos Silva',
            email: 'carlos.silva@monteiro.adv.br',
            passwordHash: '$2b$10$MYwW1V9PboQmKSvMM9hKIeyLKqH3hXuUkJyM4h7v0OIBqCzgJ6RDW', // 123456
            role: 'LAWYER',
            isActive: true,
        },
    });

    const lawyer2 = await prisma.user.create({
        data: {
            name: 'Dra. Marina Oliveira',
            email: 'marina.oliveira@monteiro.adv.br',
            passwordHash: '$2b$10$MYwW1V9PboQmKSvMM9hKIeyLKqH3hXuUkJyM4h7v0OIBqCzgJ6RDW', // 123456
            role: 'LAWYER',
            isActive: true,
        },
    });

    const attendant = await prisma.user.create({
        data: {
            name: 'Atendente João',
            email: 'joao.atendente@monteiro.adv.br',
            passwordHash: '$2b$10$MYwW1V9PboQmKSvMM9hKIeyLKqH3hXuUkJyM4h7v0OIBqCzgJ6RDW', // 123456
            role: 'ATTENDANT',
            isActive: true,
        },
    });

    console.log('✓ 4 Usuários criados\n');

    // Criar Clients (Pessoas Físicas)
    const client1 = await prisma.client.create({
        data: {
            personType: 'INDIVIDUAL',
            name: 'João Pedro Santos',
            document: '12345678900',
            secondaryId: '123456789',
            birthDate: new Date('1980-05-15'),
            maritalStatus: 'Casado',
            occupation: 'Empresário',
            phone: '(11) 3456-7890',
            whatsapp: '(11) 98765-4321',
            email: 'joao@email.com',
            zipCode: '01310-100',
            street: 'Avenida Paulista',
            number: '1000',
            neighborhood: 'Bela Vista',
            city: 'São Paulo',
            state: 'SP',
            status: 'ACTIVE',
            createdById: admin.id,
        },
    });

    const client2 = await prisma.client.create({
        data: {
            personType: 'INDIVIDUAL',
            name: 'Maria Clara Rodrigues',
            document: '98765432100',
            birthDate: new Date('1985-08-22'),
            maritalStatus: 'Solteira',
            occupation: 'Arquiteta',
            phone: '(11) 2345-6789',
            whatsapp: '(11) 99876-5432',
            email: 'maria@email.com',
            zipCode: '01425-000',
            street: 'Avenida Brasil',
            number: '2500',
            neighborhood: 'Centro',
            city: 'São Paulo',
            state: 'SP',
            status: 'ACTIVE',
            createdById: admin.id,
        },
    });

    // Cliente Pessoa Jurídica
    const client3 = await prisma.client.create({
        data: {
            personType: 'COMPANY',
            name: 'Tech Solutions Ltda',
            document: '12345678000190',
            status: 'ACTIVE',
            phone: '(11) 3234-5678',
            email: 'contato@techsolutions.com.br',
            zipCode: '04543-132',
            street: 'Rua Vergueiro',
            number: '3100',
            neighborhood: 'Vila Mariana',
            city: 'São Paulo',
            state: 'SP',
            createdById: admin.id,
        },
    });

    console.log('✓ 3 Clientes criados\n');

    // Criar Intake Forms
    const intakeForm1 = await prisma.intakeForm.create({
        data: {
            clientId: client1.id,
            lawyerId: lawyer1.id,
            attendantId: attendant.id,
            clientStatement: 'Preciso de orientação sobre contrato de separação amigável',
            preliminaryAnalysis: 'Caso simples, ambas as partes concordam',
            legalArea: 'Direito de Família',
            urgency: 'HIGH',
            viability: 'VIABLE',
            status: 'APPROVED_FOR_CASE',
            recommendation: 'Iniciar processo de divórcio consensual',
            createdById: admin.id,
            finalizedAt: new Date(),
        },
    });

    const intakeForm2 = await prisma.intakeForm.create({
        data: {
            clientId: client2.id,
            lawyerId: lawyer2.id,
            clientStatement: 'Fui discriminada no ambiente de trabalho',
            legalArea: 'Direito Trabalhista',
            urgency: 'MEDIUM',
            viability: 'NEEDS_DOCUMENTS',
            status: 'PENDING_DOCUMENTS',
            pendingDocumentsNote: 'Aguardando cópias de emails, contracheques e declarações de testemunhas',
            createdById: admin.id,
        },
    });

    const intakeForm3 = await prisma.intakeForm.create({
        data: {
            clientId: client3.id,
            lawyerId: lawyer1.id,
            clientStatement: 'Revisão de contrato de parceria comercial',
            legalArea: 'Direito Comercial',
            urgency: 'LOW',
            viability: 'VIABLE',
            status: 'DRAFT',
            createdById: admin.id,
        },
    });

    console.log('✓ 3 Intake Forms criados\n');

    // Criar Legal Cases
    const case1 = await prisma.legalCase.create({
        data: {
            clientId: client1.id,
            intakeFormId: intakeForm1.id,
            lawyerId: lawyer1.id,
            caseNumber: '0000001-00.2024.8.26.0100',
            caseType: 'JUDICIAL',
            status: 'FILED',
            legalArea: 'Direito de Família',
            actionType: 'Divórcio Consensual',
            opposingParty: 'Cônjuge - Maria Santos',
            jurisdiction: 'Comarca de São Paulo',
            court: 'Vara de Família',
            tribunal: 'TJSP',
            description: 'Ação de divórcio consensual com divisão amigável de bens',
            filingDate: new Date('2024-07-01'),
            createdById: admin.id,
        },
    });

    const case2 = await prisma.legalCase.create({
        data: {
            clientId: client2.id,
            intakeFormId: intakeForm2.id,
            lawyerId: lawyer2.id,
            caseType: 'EXTRAJUDICIAL',
            status: 'IN_PROGRESS',
            legalArea: 'Direito Trabalhista',
            actionType: 'Ação por Discriminação',
            opposingParty: 'Empresa ABC Recursos Humanos',
            description: 'Ação por discriminação de gênero e assédio moral',
            createdById: admin.id,
        },
    });

    console.log('✓ 2 Legal Cases criados\n');

    // Criar Documents
    await prisma.document.create({
        data: {
            clientId: client1.id,
            legalCaseId: case1.id,
            uploadedById: attendant.id,
            originalName: 'Certidao_Casamento.pdf',
            storedName: 'doc_001_certidao_casamento_20240715.pdf',
            documentType: 'CONTRACT',
            mimeType: 'application/pdf',
            sizeBytes: BigInt(245000),
            storageUrl: 's3://monteiro-docs/doc_001_certidao_casamento_20240715.pdf',
            description: 'Certidão de casamento para divórcio consensual',
            source: 'UPLOAD',
        },
    });

    await prisma.document.create({
        data: {
            clientId: client2.id,
            intakeFormId: intakeForm2.id,
            uploadedById: attendant.id,
            originalName: 'Email_Discriminacao.pdf',
            storedName: 'doc_002_email_discriminacao_20240720.pdf',
            documentType: 'OTHER',
            mimeType: 'application/pdf',
            sizeBytes: BigInt(156000),
            storageUrl: 's3://monteiro-docs/doc_002_email_discriminacao_20240720.pdf',
            description: 'Email discriminatório recebido do gerente',
            source: 'UPLOAD',
        },
    });

    console.log('✓ 2 Documentos criados\n');

    // Criar Case Updates
    await prisma.caseUpdate.create({
        data: {
            legalCaseId: case1.id,
            userId: lawyer1.id,
            title: 'Inicial apresentada',
            description: 'Petição inicial aceita pelo tribunal',
            type: 'PETITION',
        },
    });

    await prisma.caseUpdate.create({
        data: {
            legalCaseId: case1.id,
            userId: lawyer1.id,
            title: 'Agendada audiência de conciliação',
            description: 'Audiência marcada para 10 de agosto de 2024',
            type: 'HEARING',
            updateDate: new Date('2024-07-25'),
        },
    });

    console.log('✓ 2 Case Updates criados\n');

    // Criar Sent Emails
    await prisma.sentEmail.create({
        data: {
            clientId: client1.id,
            legalCaseId: case1.id,
            sentById: lawyer1.id,
            recipient: 'joao@email.com',
            subject: 'Início processo divórcio - Caso #0000001',
            body: 'Prezado Sr. João,\n\nInformamos que iniciamos formalmente seu processo de divórcio consensual...',
            status: 'SENT',
            sentAt: new Date('2024-07-01'),
        },
    });

    console.log('✓ 1 Email enviado registrado\n');

    // Criar Activity Logs
    await prisma.activityLog.create({
        data: {
            userId: admin.id,
            clientId: client1.id,
            action: 'CLIENT_CREATED',
            description: 'Cliente João Pedro Santos criado no sistema',
            metadata: {
                source: 'MANUAL_ENTRY',
                user_role: 'ADMIN',
            },
        },
    });

    await prisma.activityLog.create({
        data: {
            userId: lawyer1.id,
            clientId: client1.id,
            legalCaseId: case1.id,
            action: 'LEGAL_CASE_CREATED',
            description: 'Caso de divórcio consensual criado',
            metadata: {
                case_type: 'JUDICIAL',
                court: 'Vara de Família',
            },
        },
    });

    console.log('✓ 2 Activity Logs criados\n');

    console.log('✅ Seed concluído com sucesso!\n');
    console.log('Resumo:');
    console.log('  • 4 Usuários (admin, 2 advogados, 1 atendente)');
    console.log('  • 3 Clientes (2 pessoas físicas, 1 pessoa jurídica)');
    console.log('  • 3 Intake Forms');
    console.log('  • 2 Legal Cases');
    console.log('  • 2 Documentos');
    console.log('  • 2 Case Updates');
    console.log('  • 1 Email enviado');
    console.log('  • 2 Activity Logs');
}

main()
    .catch((e) => {
        console.error('❌ Erro ao executar seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
